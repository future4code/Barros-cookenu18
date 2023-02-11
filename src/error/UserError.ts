import { CustomError } from "./CustomError";

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Email inválido!")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "Senha inválido, mínimo 6 caracteres!")
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
        super(400, "Dados inválidos (email, name, password, role)")
    }
}