### 
# This script will contain functions used to aggregate the input data into more usable metrics. It will create an aggregated dataframe with the refined data and 
#  will upload this aggregated dataframe to MongoDB to be used alongside the unmodified input data.

import numpy as np

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
    print('pop mean is '+str(pop_mean))
    # Compute the deviance
    deviance = np.sum((pop_list)*(weight_list)*(sd_list**2) + (pop_list*weight_list)*(mean_list - pop_mean)**2)
    # Compute the standard deviation
    sd = np.sqrt(deviance/(np.sum(pop_list*weight_list)))
    return sd

