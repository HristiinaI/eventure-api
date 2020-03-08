export class UserDto {
    constructor(object: any) {
        this.email = object.email;
        this.password = object.password;
        this.firstName = object.firstName;
        this.lastName = object.lastName;
        this.type = object.type;
        this.country = object.country;
        this.education = object.education;
        this.workplace = object.workplace;
        this.about = object.about;
        this.organizations = object.organizations;
    }

    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly type: string;
    readonly country: string;
    readonly education: string;
    readonly workplace: string;
    readonly about: string;
    readonly organizations: String[];

}