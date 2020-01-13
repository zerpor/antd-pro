/* eslint-disable no-param-reassign */
import { Reducer } from 'redux';
import { Effect } from 'dva';
import produce from 'immer';
import lodash from 'lodash';
import { getSchool, submitSchool } from '@/services/school';
import { normalizeData, denormalizeData } from '../utils/normalizrUtils';

export const wholeEntities = {
  collegeListMap: {},
  professionListMap: {},
  classGradeListMap: {},
};

export interface Entities {
  collegeListMap: object;
  professionListMap: object;
  classGradeListMap: object;
}

export interface ClassGrade {
  id: string;
  schoolId: string;
  collegeId: string;
  professionId: string;
  name: string;
  classTeacher: string;
}

export interface Profession {
  id: string;
  schoolId: string;
  collegeId: string;
  name: string;
  professionNo: number;
  classGradeList: ClassGrade[];
}

export interface College {
  id: string;
  schoolId: string;
  collegeNo: number;
  name: string | object;
  foundingTime: string;
  principal: string;
  professionAmount: number;
  professionList: Profession[];
}

export interface Principal {
  id: string;
  name: string;
  gender: string;
  age: number;
  phoneNo: string;
  email: string;
  address: string;
}

export interface School {
  id: string;
  name: string;
  degreeEducation: string;
  address: string;
  foundingTime: string | object;
  schoolMotto: string;
  principal: Principal;
  collegeAmount: number;
  collegeList: College[];
}

export interface ModelState {
  schoolDetail?: School;
  entities?: Entities;
}

export interface ModelType {
  namespace: 'school';
  state: ModelState;
  effects: {
    getSchool: Effect;
    submitSchool: Effect;
  };
  reducers: {
    saveSchool: Reducer<ModelState>;
    updateSchool: Reducer<ModelState>;
    updatePrincipal: Reducer<ModelState>;
    addCollegeItem: Reducer<ModelState>;
    removeCollegeItem: Reducer<ModelState>;
    updateCollegeItem: Reducer<ModelState>;
    addProfessionItem: Reducer<ModelState>;
    removeProfessionItem: Reducer<ModelState>;
    updateProfessionItem: Reducer<ModelState>;
    addClassGradeItem: Reducer<ModelState>;
    removeClassGradeItem: Reducer<ModelState>;
    updateClassGradeItem: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'school',

  state: {
    schoolDetail: null,
    entities: null,
  },

  effects: {
    *getSchool({ payload }, { call, put }) {
      const response = yield call(getSchool, payload);
      if (response && response.success) {
        yield put({
          type: 'saveSchool',
          payload: response.resultData,
        });
      }

      return response;
    },
    *submitSchool({ payload }, { call, put }) {
      const result = yield put.resolve({
        type: 'form/validateFields',
      });
      if (lodash.isEmpty(result)) {
        const response = yield call(submitSchool, payload);

        return response;
      }

      return {};
    },
  },

  reducers: {
    saveSchool(state, { payload }): ModelState {
      const schoolData = { ...payload };

      if (!schoolData.collegeList) {
        schoolData.collegeList = [];
      }

      const result = normalizeData(schoolData, wholeEntities);

      return {
        ...state,
        schoolDetail: result.result,
        entities: result.entities,
      };
    },
    updateSchool(state, { payload }): ModelState {
      const { changedFields } = payload;

      return {
        ...state,
        schoolDetail: {
          ...state?.schoolDetail,
          ...changedFields,
        },
      };
    },
    updatePrincipal(state, { payload }): ModelState {
      const { changedFields } = payload;

      const nextState = produce(state, draftState => {
        draftState.schoolDetail = {
          ...draftState.schoolDetail,
          ...changedFields,
        };
      });

      return { ...nextState };
    },
    addCollegeItem(state, { payload }): ModelState {
      const { addCollegeItem } = payload;

      const nextState = produce(state, draftState => {
        draftState.schoolDetail.collegeList.push(addCollegeItem.id);
        draftState.entities.collegeListMap[addCollegeItem.id] = addCollegeItem;
      });

      return { ...nextState };
    },
    removeCollegeItem(state, { payload }): ModelState {
      const { collegeId } = payload;
      const { schoolDetail, entities } = state;
      const schoolData = denormalizeData(schoolDetail, entities);
      const collegeList = lodash.filter(schoolData.collegeList, item => item.id !== collegeId);
      schoolData.collegeList = collegeList;
      const result = normalizeData(schoolData, wholeEntities);

      return {
        ...state,
        schoolDetail: result.result,
        entities: result.entities,
      };
    },
    updateCollegeItem(state, { payload }): ModelState {
      const { collegeId, changedFields } = payload;
      const nextState = produce(state, draftState => {
        draftState.entities.collegeListMap[collegeId] = {
          ...draftState.entities.collegeListMap[collegeId],
          ...changedFields,
        };
      });

      return { ...nextState };
    },
    addProfessionItem(state, { payload }): ModelState {
      const { collegeId, addProfessionItem } = payload;

      const nextState = produce(state, draftState => {
        draftState.entities.collegeListMap[collegeId].professionList.push(addProfessionItem.id);
        draftState.entities.professionListMap[addProfessionItem.id] = addProfessionItem;
      });

      return { ...nextState };
    },
    removeProfessionItem(state, { payload }): ModelState {
      const { collegeId, professionId } = payload;

      const newProfessionList = lodash.filter(
        state.entities.collegeListMap[collegeId].professionList,
        item => item !== professionId,
      );
      const { classGradeList } = state.entities.professionListMap[professionId];
      const nextState = produce(state, (draftState: any) => {
        draftState.entities.collegeListMap[collegeId].professionList = newProfessionList;
        delete draftState.entities.professionListMap[professionId];
        lodash.map(classGradeList, itemId => {
          delete draftState.entities.classGradeListMap[itemId];
        });
      });

      return { ...nextState };
    },
    updateProfessionItem(state, { payload }): ModelState {
      const { professionId, changedFields } = payload;
      const nextState = produce(state, draftState => {
        draftState.entities.professionListMap[professionId] = {
          ...draftState.entities.professionListMap[professionId],
          ...changedFields,
        };
      });

      return { ...nextState };
    },
    addClassGradeItem(state, { payload }): ModelState {
      const { professionId, addClassGradeItem } = payload;

      const nextState = produce(state, draftState => {
        draftState.entities.professionListMap[professionId].classGradeList.push(
          addClassGradeItem.id,
        );
        draftState.entities.classGradeListMap[addClassGradeItem.id] = addClassGradeItem;
      });

      return { ...nextState };
    },
    removeClassGradeItem(state, { payload }): ModelState {
      const { professionId, classId } = payload;

      const newClassList = lodash.filter(
        state.entities.professionListMap[professionId].classGradeList,
        item => item !== classId,
      );
      const nextState = produce(state, (draftState: any) => {
        draftState.entities.professionListMap[professionId].classGradeList = newClassList;
        delete draftState.entities.classGradeListMap[classId];
      });

      return { ...nextState };
    },
    updateClassGradeItem(state, { payload }): ModelState {
      const { classId, changedFields } = payload;
      const nextState = produce(state, draftState => {
        draftState.entities.classGradeListMap[classId] = {
          ...draftState.entities.classGradeListMap[classId],
          ...changedFields,
        };
      });

      return { ...nextState };
    },
  },
};

export default Model;
