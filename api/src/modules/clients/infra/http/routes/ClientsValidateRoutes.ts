// import { messageJoiCelebrate } from '@config/messageJoiCelebrate';
import { patternPassword } from '@utils/patternPassword';
import { Joi, Segments, celebrate } from 'celebrate';

export class ClientsValidateRoutes {
  create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required().max(255),
        cpf: Joi.string()
          .length(11)
          .pattern(/^[0-9]+$/)
          .required(),
        password: Joi.string()
          .pattern(patternPassword)
          .required()
          .min(6)
          .max(255),
        confirm_password: Joi.string()
          .required()
          .pattern(patternPassword)
          .min(6)
          .max(255)
          .valid(Joi.ref('password')),
        birthDate: Joi.string().required(),
      },
    });
  }
  update() {
    return celebrate({
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().required().max(255),
        cpf: Joi.string()
          .length(11)
          .pattern(/^[0-9]+$/)
          .required(),
        password: Joi.string().pattern(patternPassword).min(6).max(255),
        confirm_password: Joi.when('password', {
          is: Joi.exist(),
          then: Joi.string()
            .required()
            .pattern(patternPassword)
            .min(6)
            .max(255)
            .valid(Joi.ref('password')),
          otherwise: Joi.optional(),
        }),
        birthDate: Joi.string().required(),
      },
    });
  }
}
