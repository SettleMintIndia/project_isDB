import {
    LOGIN_API, GET_SCENARIO_EXISTS, CREATE_SCENARIO,
    LOG_OUT, GET_ALL_ADMINS, GET_ALL_SCENARIOS,
    GET_ALL_DISTRIBUTIONS,
    CREATE_TEMPLATE,
    GET_TEMPLATES,
    GET_TEMPLATE_DETAILS,
    DELETE_TEMPLATE,
    GET_TEMPLATE_EXISTS,
    GET_ADMIN_INFO,
    CREATE_ADMIN,
    DELETE_ADMIN,
    UPLOAD_IMAGE,
    UPLOAD_PASSWORD,
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
} from './config'

const apiSettings = {
    //login api
    getLogin: async (body) => {
        const result = await (
            await fetch(
                LOGIN_API,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },

    createAdmin: async (body) => {
        const result = await (
            await fetch(
                CREATE_ADMIN,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getAdminInformation: async (email) => {
        const result = await (
            await fetch(
                GET_ADMIN_INFO + "?email=" + email,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;


    },
    updatePassword: async (body) => {
        const result = await (
            await fetch(
                UPLOAD_PASSWORD,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    uploadUserImage: async (body) => {
        const result = await (
            await fetch(
                UPLOAD_IMAGE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getAdmins: async (body) => {
        const result = await (
            await fetch(
                GET_ALL_ADMINS,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getdeleteAdmin: async (body) => {
        const result = await (
            await fetch(
                DELETE_ADMIN,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getAllScenarios: async () => {
        const result = await (
            await fetch(
                GET_ALL_SCENARIOS,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;
    },
    getDistributions: async () => {
        const result = await (
            await fetch(
                GET_ALL_DISTRIBUTIONS,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;
    },
    getScenarioExists: async (type) => {
        const result = await (
            await fetch(
                GET_SCENARIO_EXISTS + "?scenario_name=" + type,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;
    },

    createTemplate: async (body) => {
        const result = await (
            await fetch(
                CREATE_TEMPLATE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getAllTemplates: async (body) => {
        const result = await (
            await fetch(
                GET_TEMPLATES,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getDeleteTemplate: async (body) => {
        const result = await (
            await fetch(
                DELETE_TEMPLATE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },

    getTemplateExists: async (name) => {
        const result = await (
            await fetch(
                GET_TEMPLATE_EXISTS + "?template_name=" + name,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getTemplateDetails: async (name) => {
        const result = await (
            await fetch(
                GET_TEMPLATE_DETAILS + "?template_name=" + name,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    createScenario: async (body) => {

        console.log(body, CREATE_SCENARIO)
        const result = await (
            await fetch(
                CREATE_SCENARIO,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },

    logout: async () => {
        const result = await (
            await fetch(
                LOG_OUT,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getRequestScenario: async (body) => {
        const result = await (
            await fetch(
                REQUEST_GET_SCENARIO,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;

    },
    runSimulation: async (body) => {
        const result = await (
            await fetch(
                RUN_SIMULATION,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getOrderDetails: async (ex_id, iteration, round) => {
        const result = await (
            await fetch(
                GET_ORDERDETAILS + "?execution_id=" + ex_id + "&iteration=" + iteration + "&round=" + round,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getTradeHistoryWithStablization: async (ex_id, iteration, round) => {
        const result = await (
            await fetch(
                GET_TRADEHISTORYWS + "?execution_id=" + ex_id + "&iteration=" + iteration + "&round=" + round,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getTradeHistoryWithoutStablization: async (ex_id, iteration, round) => {
        const result = await (
            await fetch(
                GET_TRADEHISTORYNS + "?execution_id=" + ex_id + "&iteration=" + iteration + "&round=" + round,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getStablizationFundDetails: async (ex_id) => {
        const result = await (
            await fetch(
                GET_STABLIZATION_FUND + "?execution_id=" + ex_id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;
    },

    getSimulationResult: async (ex_id, type) => {
        const result = await (
            await fetch(
                GET_SIMULATIONRESULT + "?execution_id=" + ex_id + "&type=" + type,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;

    },
    getNotifications: async (id) => {
        const result = await (
            await fetch(
                GET_NOTIFICATIONS + "?admin_id=" + id,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        ).json();
        return result;
    },
    getSimulationHistory: async (body) => {

        const result = await (
            await fetch(
                GET_SIMULATION_HISTORY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    },
    getChangeVisiblityTemplate: async (body) => {

        const result = await (
            await fetch(
                GET_CHANGE_VISIBILITY_TEMPLATE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            )
        ).json();
        return result;
    }
}


export default apiSettings;