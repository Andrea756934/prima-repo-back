import { notFoundHandler } from "./not-found.error";
import { genericErrorHandel } from "./generic";
import { wrongRoleHandler } from "./wrong-role.error";
import { alreadyCompletedHandler } from "./already-completed.error";

export const errorHandlers = [
    notFoundHandler,
    genericErrorHandel,
    wrongRoleHandler,
    alreadyCompletedHandler
];