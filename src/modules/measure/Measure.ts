import { z } from 'zod';

export interface MeasureResponse {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}

export const measure_type = ['WATER', 'GAS'] as const;

export const measureSchema = z
  .object({
    image: z
      .string({ message: "O campo 'image' deve ser uma string" })
      .min(1, { message: "o campo 'image' deve ser um base64" })
      .refine((value) => value.length % 4 === 0, {
        message: "o campo 'image' deve ser um base64",
      })
      .refine((value) => /^[A-Za-z0-9+/]+[=]{0,2}$/.test(value ?? ''), {
        message: "o campo 'image' deve ser um base64",
      }),
    customer_code: z.string({
      message: "O campo 'customer_code' deve ser uma string",
    }),
    measure_datetime: z.string({
      message: "O campo 'measure_datetime' deve ser uma string",
    }),
    measure_type: z.enum(measure_type, {
      message: "O campo 'measure_type' deve ser 'WATER' ou 'GAS'",
    }),
  })
  .required();

export const confirmMeasure = z
  .object({
    measure_uuid: z.string({
      message: "O campo 'measure_uuid' deve ser uma string",
    }),
    confirmed_value: z.number({
      message: "O campo 'confirmed_value' deve ser um número",
    }),
  })
  .required();

export type createMeasureDTO = z.infer<typeof measureSchema>;
export type confirmMeasureDTO = z.infer<typeof confirmMeasure>;
