import type {Response, Request} from 'express';


export const Register = (_req: Request, res: Response) => {
    res.send("User registration endpoint");
}

export const Login = (_req: Request, _res: Response) => {

}
