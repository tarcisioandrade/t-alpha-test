import { z } from "zod";

// eslint-disable-next-line
export const TAX_NUMBER_REGEXP_VALIDATOR =
  /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;

export const userSchema = z.object({
  name: z.string({ message: "O nome é obrigatório" }),
  taxNumber: z.string({ message: "O CPF/CNPJ é obrigatório" }).regex(TAX_NUMBER_REGEXP_VALIDATOR, {
    message: "O CPF ou CNPJ deve conter 11 ou 14 dígitos",
  }),
  mail: z
    .string({ message: "O email é obrigatório" })
    .email({ message: "O email deve ser válido" }),
  phone: z.string({ message: "O telefone é obrigatório" }),
  password: z.string({ message: "A senha é obrigatória" }),
});

export const loginSchema = z.object({
  taxNumber: z
    .string({ message: "O CPF/CNPJ é obrigatório" })
    .regex(TAX_NUMBER_REGEXP_VALIDATOR, {
      message: "O CPF ou CNPJ deve conter 11 ou 14 dígitos",
    })
    .max(14, "O CPF ou CNPJ deve conter 11 ou 14 dígitos"),
  password: z.string({ message: "A senha é obrigatória" }),
});

export type User = z.infer<typeof userSchema>;
export type UserLogin = z.infer<typeof loginSchema>;
