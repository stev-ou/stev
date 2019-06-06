//////////
const DEBUG = false;
//////////

// API mapping, based on search type selected from the Header menu
export const api_map = {
  course: 'courses/',
  department: 'department/',
  instructor: 'instructors/',
};

export const api_arg_map = {
  course: '?course=',
  department: '?department=',
  instructor: '?instructor=',
};

var api_endpoint;

if (!DEBUG) {
  api_endpoint = 'https://stev-api-h74xgrgcea-uc.a.run.app/api/v0/';
} else {
  api_endpoint = 'http://127.0.0.1:5050/api/v0/';
}

export { api_endpoint };

export var colors = [
  '#3f51b5',
  '#ff5722',
  '#e91e63',
  '#ffc107',
  '#9c27b0',
  '#00bcd4',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#f44336',
  '#795548',
  '#607d8b',
  '#4caf50',
  '#2196f3',
  '#8bc34a',
  '#ff9800',
  '#3f51b5',
  '#ff5722',
  '#e91e63',
];

export var dept_chip_colors = {
  ENGR: '#01721e',
  AME: '#02e43c',
  'CH E': '#04565a',
  CEES: '#05c878',
  ECE: '#073a96',
  TCOM: '#08acb4',
  'I E': '#0a1ed2',
  'C S': '#0b90f0',
  BIOE: '#0d030e',
  ISE: '#0e752c',
  BME: '#0fe74a',
  DSA: '#115968',
  EDAH: '#12cb86',
  EACS: '#143da4',
  EDS: '#15afc2',
  EDSP: '#1721e0',
  ILAC: '#1893fe',
  EIPT: '#1a061c',
  EDPY: '#1b783a',
  EDEC: '#1cea58',
  EDUC: '#1e5c76',
  EDMA: '#1fce94',
  EDLT: '#2140b2',
  EDEN: '#22b2d0',
  EDSC: '#2424ee',
  EDSS: '#25970c',
  EDEL: '#27092a',
  EDRG: '#287b48',
  EDPC: '#29ed66',
  EDWL: '#2b5f84',
  CAS: '#2cd1a2',
  ANTH: '#2e43c0',
  AFAM: '#2fb5de',
  CHEY: '#3127fc',
  CHOC: '#329a1a',
  CHER: '#340c38',
  BOT: '#357e56',
  CHEM: '#36f074',
  MBIO: '#386292',
  KIOW: '#39d4b0',
  LTRS: '#3b46ce',
  'CL C': '#3cb8ec',
  LAT: '#3e2b0a',
  GRK: '#3f9d28',
  ECON: '#410f46',
  COMM: '#428164',
  ENGL: '#43f382',
  FVS: '#4565a0',
  HES: '#46d7be',
  HIST: '#4849dc',
  'H R': '#49bbfa',
  HSCI: '#4b2e18',
  IPE: '#4ca036',
  MATH: '#4e1254',
  LIS: '#4f8472',
  ARAB: '#50f690',
  FR: '#5268ae',
  CHIN: '#53dacc',
  GERM: '#554cea',
  ITAL: '#56bf08',
  MLLL: '#583126',
  SPAN: '#59a344',
  JAPN: '#5b1562',
  LING: '#5c8780',
  PORT: '#5df99e',
  RUSS: '#5f6bbc',
  NAS: '#60ddda',
  HEBR: '#624ff8',
  PHIL: '#63c216',
  ASTR: '#653434',
  PHYS: '#66a652',
  'P SC': '#681870',
  ODYN: '#698a8e',
  PSY: '#6afcac',
  RELS: '#6c6eca',
  'S WK': '#6de0e8',
  SOC: '#6f5306',
  ZOO: '#70c524',
  'W S': '#723742',
  BIOL: '#73a960',
  KM: '#751b7e',
  GEOL: '#f73a0a',
  FMS: '#77ffba',
  WGS: '#7971d8',
  PBIO: '#7ae3f6',
  PERS: '#7c5614',
  CREK: '#7dc832',
  UNIV: '#7f3a50',
  ENST: '#80ac6e',
  NPNG: '#821e8c',
  LGBT: '#8390aa',
  MRS: '#8502c8',
  PHCH: '#8674e6',
  HMS: '#87e704',
  '|D': '#895922',
  RCPL: '#8acb40',
  ARCH: '#8c3d5e',
  CNS: '#8daf7c',
  END: '#8f219a',
  LA: '#9093b8',
  PDC: '#9205d6',
  ACCT: '#9377f4',
  MKT: '#94ea12',
  SCM: '#965c30',
  EMBA: '#97ce4e',
  MGT: '#99406c',
  BAD: '#9ab28a',
  MIS: '#9c24a8',
  MIT: '#9d96c6',
  ENT: '#9f08e4',
  ENGB: '#a07b02',
  BC: '#a1ed20',
  FIN: '#a35f3e',
  EMGT: '#a4d15c',
  LS: '#a6437a',
  FRAN: '#a7b598',
  DRAM: '#a927b6',
  MUNM: '#aa99d4',
  VOIC: '#ac0bf2',
  MUTH: '#ad7e10',
  MUSC: '#aef02e',
  ARTH: '#b0624c',
  VIOL: '#b1d46a',
  AHI: '#b34688',
  MUTE: '#b4b8a6',
  MTHR: '#b62ac4',
  DES: '#b79ce2',
  ART: '#b90f00',
  DANC: '#ba811e',
  TRMP: '#bbf33c',
  BASS: '#bd655a',
  MUED: '#bed778',
  EUPH: '#c04996',
  TROM: '#c1bbb4',
  PIAN: '#c32dd2',
  VIOA: '#c49ff0',
  CLAR: '#c6120e',
  FRH: '#c7842c',
  SAX: '#c8f64a',
  ARNM: '#ca6868',
  PCUS: '#cbda86',
  GDMA: '#cd4ca4',
  HARP: '#cebec2',
  COMP: '#d030e0',
  OBOE: '#d1a2fe',
  UGRE: '#d3151c',
  MUTK: '#d4873a',
  CELO: '#d5f958',
  AHi: '#d76b76',
  SRRE: '#d8dd94',
  FLUT: '#da4fb2',
  ORGN: '#dbc1d0',
  TUBA: '#dd33ee',
  ATC: '#dea60c',
  MULI: '#e0182a',
  LDMA: '#e18a48',
  ARTC: '#e2fc66',
  MUS: '#e46e84',
  BASN: '#e5e0a2',
  GTAR: '#e752c0',
  JRRE: '#e8c4de',
  GRRE: '#ea36fc',
  'AHI.': '#eba91a',
  GEOG: '#ed1b38',
  METR: '#ee8d56',
  GIS: '#efff74',
  AGSC: '#f17192',
  IAS: '#f2e3b0',
  JMC: '#f455ce',
  PE: '#f5c7ec',
  GPHY: '#f8ac28',
  GE: '#fa1e46',
  'GEOL1034-012/METR': '#fb9064',
};
