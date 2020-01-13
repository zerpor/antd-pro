import { schema, normalize, denormalize } from 'normalizr';

const schemaDefinition = (function createSchema() {
  const classGrade = new schema.Entity('classGradeListMap');
  const profession = new schema.Entity('professionListMap', {
    classGradeList: [classGrade],
  });
  const college = new schema.Entity('collegeListMap', {
    professionList: [profession],
  });

  return {
    collegeList: [college],
  };
})();

// 根据数据和完整的entities生成扁平化后的数据
export const normalizeData = (data, wholeEntities) => {
  const output = normalize(data, schemaDefinition);
  const { entities } = output;
  const finalEntities = {
    ...wholeEntities,
    ...entities,
  };
  return {
    result: output.result,
    entities: finalEntities,
  };
};

export const denormalizeData = (data, entities) => {
  if (!data || !entities) return {};
  return denormalize(data, schemaDefinition, entities);
};
