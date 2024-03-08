let base_url = "http://142.93.210.23:3000/"; // dev


const LOGIN_API= base_url+"login";
const GET_ALL_SCENARIOS=base_url+"getScenarios"
const GET_ALL_DISTRIBUTIONS=base_url+"getDistributions"
const CREATE_TEMPLATE=base_url+"createTemplate"
const GET_SCENARIO_EXISTS=base_url+"getScenarioExists";
const CREATE_SCENARIO=base_url +"createScenario"
const LOG_OUT=base_url+"logout"
const GET_ALL_ADMINS=base_url+"getAdmins"
const GET_ADMIN_INFO=base_url+"getAdminInfo"
const CREATE_ADMIN=base_url+"register"
const DELETE_ADMIN=base_url+"deleteAdmin"
const UPLOAD_IMAGE=base_url+"changeDisplayPic"
const UPLOAD_PASSWORD=base_url+"changePassword"
const GET_TEMPLATES=base_url+"getTemplates"
const GET_TEMPLATE_DETAILS=base_url+"getTemplateByName"
const DELETE_TEMPLATE=base_url+"deleteTemplate"
const GET_TEMPLATE_EXISTS=base_url+"checkTempNameAvailable"

const REQUEST_GET_SCENARIO=base_url+"requestNewScenario"
const RUN_SIMULATION=base_url+"runSimulation"
const GET_ORDERDETAILS=base_url+"getOrdersForExecution"
const GET_TRADEHISTORYWS=base_url+"tradeHistoryWS"
const GET_TRADEHISTORYNS=base_url+"tradeHistoryNS"
const GET_STABLIZATION_FUND=base_url+"getStabilizationFund"
const GET_SIMULATIONRESULT=base_url+"getSimulationResult"

const GET_NOTIFICATIONS=base_url+"getNotifications"

const GET_SIMULATION_HISTORY=base_url+"getSimulations"
const GET_CHANGE_VISIBILITY_TEMPLATE=base_url+"changeTemplateVisibility"


export {
    base_url,
    LOGIN_API,
    GET_ALL_ADMINS,
    GET_ADMIN_INFO,
    GET_ALL_SCENARIOS,
    GET_ALL_DISTRIBUTIONS,
    CREATE_TEMPLATE,
    GET_TEMPLATES,
    GET_SCENARIO_EXISTS,
    CREATE_SCENARIO,
    LOG_OUT,
    CREATE_ADMIN,
    DELETE_ADMIN,
    UPLOAD_IMAGE,
    UPLOAD_PASSWORD,GET_TEMPLATE_DETAILS,
    DELETE_TEMPLATE,
    GET_TEMPLATE_EXISTS,
    REQUEST_GET_SCENARIO,
    RUN_SIMULATION,
    GET_ORDERDETAILS,
    GET_TRADEHISTORYWS,
    GET_TRADEHISTORYNS,
    GET_STABLIZATION_FUND,
    GET_SIMULATIONRESULT,
    GET_NOTIFICATIONS,
    GET_SIMULATION_HISTORY,
    GET_CHANGE_VISIBILITY_TEMPLATE

}