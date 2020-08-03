export const API_CONFIG = {
    //baseUrl: "http://10.1.1.11:8080/",
    baseUrl: "http://localhost:8080/",
    paths: {
        "login": "login",
        "sectors": "api/sectors",
        "computers": "api/computers",
        "printers": "api/printers",
        "network_devices": "api/network_devices",
        "monitors": "api/monitors",
        "computer_users": "api/computer_users",
        "electronics": "api/electronics",
    },
    standardSearchMethod: {
        "search": "search",
    },
    computerSearchMethods: {
        "searchComputerProcessor": "search/processor_terms",
        "searchComputerComputerUser": "search/computer_user_terms",
        "searchComputerOnline": "search/online",
        "searchComputerOnTheDomain": "search/on_the_domain",
        "searchComputerPersonalComputer": "search/personal_computer"
    }
}
