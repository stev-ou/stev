'''
This script will contain functions used to aggregate the input data into more usable metrics. It will create an aggregated dataframe with the refined data and 
 will upload this aggregated dataframe to MongoDB to be used alongside the unmodified input data. Further documentation on the combination of means and standard deviations is available 
 in the data_aggregation_exploration.ipynb.

 '''


import numpy as np
import pandas as pd
import yaml

def combine_means(mean_list, pop_list, weight_list):
    '''
    This function takes lists of means, population sizes, and weights for each population, and combines the result into a single mean value.
    * All lists must be the same length
    '''
    mean_list = np.array(mean_list)
    pop_list = np.array(pop_list)
    weight_list = np.array(weight_list)
    # Check for equal sized lists
    if not len(mean_list)==len(pop_list)==len(weight_list):
        print('All input lists to the function -- combine_standard_deviations -- must be of the same length.')
        # Proceed with the program
    # Combine the population-and-weight-modulated means
    mean = np.sum(mean_list*pop_list*weight_list)/(np.sum(pop_list*weight_list))
    return mean
    

def combine_standard_deviations(sd_list, mean_list,pop_list, weight_list):
    '''
    This function will take lists of standard deviations, means, population sizes, and weights for each list unit. The function
    will combine the lists to produce a standard deviation for the group, based on the input parameters. Formula for combining the SD taken from the below link:
    
    https://www.researchgate.net/post/How_to_combine_standard_deviations_for_three_groups
    
    * All lists must be same length
    '''
    # Convert all input lists into numpy arrays
    sd_list = np.array(sd_list)
    mean_list = np.array(mean_list)
    pop_list = np.array(pop_list)
    weight_list = np.array(weight_list)
    # Check for equal sized lists
    if not len(sd_list) == len(mean_list)==len(pop_list)==len(weight_list):
        print('All input lists to the function -- combine_standard_deviations -- must be of the same length.')
    # Proceed with the program
    # Compute the weighted mean of the populations
    pop_mean = combine_means(mean_list, pop_list, weight_list)
    # Compute the deviance
    deviance = np.sum((pop_list)*(weight_list)*(sd_list**2) + (pop_list*weight_list)*(mean_list - pop_mean)**2)
    # Compute the standard deviation
    sd = np.sqrt(deviance/(np.sum(pop_list*weight_list)))
    return pop_mean,sd


def aggregate_data(df):

    # Initialize the aggregated dataframe by copying the base data frame
    ag_df = df.copy()

    # Drop the unnecessary columns
    ag_df.drop(['Department Code', 'Question Number','Section Number','Responses', 'CRN','Campus Code','Question', 'Mean', 'Median', 'Standard Deviation', 'Department Mean', 'Department Median', 'Similar College Mean', 'College Mean', 'College Median', 'Percent Rank - Department', 'Percent Rank - College', 'Percent #1', 'Percent #2', 'Percent #3', 'Percent #4', 'Percent #5', 'ZScore - College', 'ZScore - College Similar Sections', 'Course Level', 'Section Size', 'Similar College Median'], axis=1, inplace = True)

    # Add in the columns to be filled with the aggregated values
    ag_df.insert(3,'Avg Department Rating', 0.0)
    ag_df.insert(4,'SD Department Rating', 0.0)
    ag_df.insert(7,'Avg Course Rating', 0.0)
    ag_df.insert(8,'SD Course Rating', 0.0)
    ag_df.insert(12, 'Avg Instructor Rating In Section', 0.0)
    ag_df.insert(13, 'SD Instructor Rating In Section', 0.0)
    ag_df.insert(14, 'Num Responses', 0)
    # # Swap the columns Section Number and Section Title
    # swap_col_order = list(ag_df.columns)
    # # swap_col_order[6] = 'Instructor ID'
    # # swap_col_order[9] = 'Section Number'
    # ag_df = ag_df.reindex(columns = swap_col_order)

    # Rename the Instructor 1 ID, Instructor 1 First Name, Last Name columns
    ag_df.rename(columns = {'Section Title':'Course Title', 'Responses':'Num Responses','Instructor 1 ID': 'Instructor ID', 'Instructor 1 First Name':'Instructor First Name', 'Instructor 1 Last Name':'Instructor Last Name'}, inplace= True)

    # Remove the repeat rows that will occur because we are taking 1-10 question responses down to 1
    ag_df.drop_duplicates(subset = ag_df.columns.drop('Course Title'), inplace = True)

    # Read in the question mappings values from the mappings.yaml
    with open('mappings.yaml') as f:
        # use safe_load instead load
        mappings = yaml.safe_load(f)
        question_weighting = mappings['Instructor_question_weighting']

    # Lets fill the average instructor ranking in each section, i.e. the combined rating for each question per section
    for subject in df['Subject Code'].unique(): # Iterate over all subjects (test case - for subject in ['DSA']:)
        for course in df[(df['Subject Code']==subject)]['Course Number'].unique(): # Iterate over courses with the desired subject 
            for instructor in df[(df['Subject Code']==subject) & (df['Course Number']==course)]['Instructor 1 ID'].unique(): # Iterate over instructors with desired subject and course number
                # Modify the subset based on the desired instructor (see section index above)
                subset = df[(df['Subject Code']==subject) & (df['Course Number']==course) & (df['Instructor 1 ID']==instructor)]        
                if len(subset)!=0: 
                    # Compute the combined mean and standard deviation of the questions
                    # Input the standard deviation, mean, number of responses, and the question number mapped to the weights for each subject-course-instructor combination
    #                 print(len(subset['Standard Deviation']))
                    instructor_mean, instructor_sd = combine_standard_deviations(subset['Standard Deviation'], subset['Mean'], subset['Responses'], subset['Question Number'].map(arg=question_weighting))

                    # Set the combined mean and combined sd value into the aggregated dataframe
                    # Find the row of interest in the aggregated df
                    ag_df_section_row = ag_df[(ag_df['Subject Code']==subject) & (ag_df['Course Number']==course) & (ag_df['Instructor ID']==instructor)].index.tolist()
                    if len(ag_df_section_row)!=1:
                        print('Aggregated Dataframe contains incorrect number of entries (number entries =' + str(len(ag_df_section_row))+ ') for subject: '+ str(subject)+ ', course: '+ str(course)+ ', and instructor: '+ str(instructor))
                    else:
                        # Fill the Instructor Ratings Columns
                        ag_df.at[ag_df_section_row[0], 'Avg Instructor Rating In Section'] = instructor_mean
                        ag_df.at[ag_df_section_row[0], 'SD Instructor Rating In Section'] = instructor_sd

                        # Fill the Num Responses column, based on the minimum number of responses of the group of questions
                        # if they teach two or more courses, add the number of students in each course to get the total number
                        total_responses = 0
                        if int(len(subset['Responses'])/5) <1:
                            print('Less than 5 questions are available for subject: '+ str(subject)+ ', course: '+ str(course)+ ', and instructor: '+ str(instructor))
                        for i in range(int(len(subset['Responses'])/5)):
                            total_responses = total_responses + list(subset['Responses'])[5*i]
                        # Set the Num Responses in the agg df equal to the total responses in this course
                        ag_df.at[ag_df_section_row[0], 'Num Responses'] = total_responses

                else:
                    print('Could not find the combination for subject: '+ str(subject)+ ', course: '+ str(course)+ ', and instructor: '+ str(instructor))
            # Back to Course level of tree, now that we've filled out the instructor level info
            # Modify the dataframe subset that consists only of the entries with the desired course (see course index above)
            # Note that now our subset consists of aggregated data from all instructors within the desired course
            subset = ag_df[(ag_df['Subject Code']==subject) & (ag_df['Course Number']==course)]
            # Compute the combined mean and standard deviation of all of the instructors within the course
            #### IMPORTANT #### NO POPULATION-BASED OR OTHER WEIGHTING USED IN THE CALCULATION OF SD AND AVERAGE COURSE RATING

            course_mean, course_sd = combine_standard_deviations(subset['SD Instructor Rating In Section'], subset['Avg Instructor Rating In Section'], np.ones(len(subset['SD Instructor Rating In Section'])), np.ones(len(subset['SD Instructor Rating In Section'])))
            # Find the row of interest in the desired df
            ag_df_course_rows = ag_df[(ag_df['Subject Code']==subject) & (ag_df['Course Number']==course)].index.tolist()
            # Fill the Course ratings columns
            ag_df.at[ag_df_course_rows, 'Avg Course Rating'] = course_mean
            ag_df.at[ag_df_course_rows, 'SD Course Rating'] = course_sd

        # Back to Department level of tree, now that we've filled out the instructor and course level info
        # Modify the dataframe subset that consists only of the entries with the desired subject(see course index above)
        # Note that now our subset consists of aggregated data from all instructors and courses within the desired subject/department
        subset = ag_df[(ag_df['Subject Code']==subject)]
        # Compute the combined mean and standard deviation of all of the courses within the department
        #### IMPORTANT #### NO POPULATION-BASED OR OTHER WEIGHTING USED IN THE CALCULATION OF SD AND AVERAGE COURSE RATING

        department_mean, department_sd = combine_standard_deviations(subset['SD Course Rating'], subset['Avg Course Rating'], np.ones(len(subset['Avg Course Rating'])), np.ones(len(subset['Avg Course Rating'])))
        # Find the row of interest in the desired df
        ag_df_course_rows = ag_df[(ag_df['Subject Code']==subject)].index.tolist()
        
        # Fill the Course ratings columns
        ag_df.at[ag_df_course_rows, 'Avg Department Rating'] = department_mean
        ag_df.at[ag_df_course_rows, 'SD Department Rating'] = department_sd
        
    return ag_df

if __name__ == '__main__':
    
    df = pd.read_csv("data/gcoe_sp18.csv") # Modify to correct data location
    
    ag_df = aggregate_data(df)
    
    if len(ag_df[ag_df[['Course Title', 'Instructor Last Name']].duplicated() == True]) == 0:
        print("From basic tests, the data aggregation is working correctly.")