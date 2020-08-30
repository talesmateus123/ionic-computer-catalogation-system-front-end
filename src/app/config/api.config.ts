export const API_CONFIG = {
    paths: {
        login: 'login',
        clients: 'clients',
        sectors: 'sectors',
        computers: 'computers',
        printers: 'printers',
        network_devices: 'network_devices',
        monitors: 'monitors',
        computer_users: 'computer_users',
        processors: 'processors',
        storage_devices: 'storage_devices',
        ram_memories: 'ram_memories',
        electronics: 'electronics',
        ping_request: 'ping',
        auth_refresh_token: 'auth/refresh_token',
        auth_forgot_password: 'auth/forgot_password'
    },
    standardSearchMethod: {
        search: 'search',
    },
    computerSearchMethods: {
        searchComputerProcessor: 'search/processor_terms',
        searchComputerComputerUser: 'search/computer_user_terms',
        searchComputerOnline: 'search/online',
        searchComputerOnTheDomain: 'search/on_the_domain',
        searchComputerPersonalComputer: 'search/personal_computer'
    }
};
