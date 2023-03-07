export class CustomError extends Error{
    constructor(public statusCode:number, public message:string){
        super(message)
    }
}

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Email inválido!")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "Senha inválida")
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(404, "Usuário não encontrado!")
    }
}

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuario invalido inválido")
    }
}

export class InvalidBody extends CustomError{
    constructor(){
        super(400, "Dados inválidos")
    }
}

export class invalidFollow extends CustomError{
    constructor(){
        super(400, "Usuário não encontrado")
    }
}

export class UserExist extends CustomError{
    constructor(){
        super(400, "Usuário já existe")
    }
}
