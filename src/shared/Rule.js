export const idCheck = (id) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*/;

  return _reg.test(id);
};
