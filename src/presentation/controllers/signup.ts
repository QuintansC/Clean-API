import { AddAccount } from '../../domain/usecases/add-account';
import { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount;

    constructor(emailValidator: EmailValidator, addAccount: AddAccount){
        this.emailValidator = emailValidator;
        this.addAccount = addAccount;
    }
    handle(httpRequest: HttpRequest): HttpResponse{
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
            this.addAccount.add({
                name: fields['name'],
                email: fields['email'],
                password: fields['password']
            })                
        }catch(error){
            return serverError();
        }
    }
}