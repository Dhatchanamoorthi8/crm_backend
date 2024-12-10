import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    DashboardData(id: string): Promise<{
        newClientsCount: number;
        followUpClientsCount: number;
        followUpClients: {
            id: any;
            Status: any;
            company_name: any;
            client_name: any;
            followup_Date: string;
        }[];
    }>;
}
