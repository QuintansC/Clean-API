import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, ok } from '../../helpers/http-helper';


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount){
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try{     
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            const fields = httpRequest.body;
            for (const field of requiredFields) {
                if(!fields[field]){
                    return badRequest(new MissingParamError(field))
                }            
            }
            const isValid = this.emailValidator.isValid(fields['email'])
            if(!isValid){
                return badRequest(new InvalidParamError('email'))
            }
            if(fields['password'] !== fields['passwordConfirmation']){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            } 
            const account = await this.addAccount.add({
                name: fields['name'],
                email: fields['email'],
                password: fields['password']
            })
            return ok(account);                
        }catch(error){
            return serverError();
        }
    }
}