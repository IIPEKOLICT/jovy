import { Middleware } from '../abstractions/types';
import { IControllerService, IHandler } from '../abstractions/interfaces';
import { ControllerService } from '../services';

export function setMiddlewares(...newMiddlewares: Middleware[]): MethodDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const controllerService: IControllerService = new ControllerService(target);
    const existsHandler: IHandler | undefined = controllerService.getHandler(propertyKey);

    const middlewares: Middleware[] = (existsHandler?.middlewares || []).concat(newMiddlewares);

    const updatedHandler: IHandler = { name: String(propertyKey), middlewares };
    controllerService.updateHandlers(updatedHandler);
  };
}
