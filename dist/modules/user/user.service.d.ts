import { DynamicModelService } from '@utils/dynamicModel.service';
export declare class UserService {
    private readonly dynamicModelService;
    private readonly request;
    constructor(dynamicModelService: DynamicModelService, request: Request);
    fetchUser(): Promise<object>;
}
