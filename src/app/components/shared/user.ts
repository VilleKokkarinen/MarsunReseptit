export class PublicUser {
    id: string = "";
    displayName: string = "";
    avatar: string = "";
    user: string = "";
}

export class PrivateUser {
    id: string = "";
    username: string = "";
    email: string = "";
    verified: boolean = false;
}

export class Benefits{
    ads:boolean = true;
    img_res:number = 512;
    img_amount:number = 0;
    img_quality:number = 0.5;
}

export class UserTierBenefits {
    name: string = "";
    benefits:Benefits = new Benefits();
}

export class UserTier {
    id: string = "";
    user: string = "";
    benefits?: UserTierBenefits;
}
