/**
 * 判断是不是给选项组
 * @param child
 * @returns
 */
const isOptionGrou = (child: ICFOptGroupChild): child is ICFOptGroup => {
  return 'type' in child && child.type === OPTION_GROUP_CHILD_TYPE.GROUP;
};

export { isOptionGrou };
