import * as yup from 'yup';

const validate = async <TShape extends yup.ObjectShape>(
  request: Request,
  spec: TShape
) => {
  const formData = await request.formData(),
    object = Object.keys(spec).reduce(
      (a, b) => ({ ...a, [b]: formData.get(b) }),
      {}
    ),
    result = yup.object(spec).validate(object);
  return result;
};

export { validate };
