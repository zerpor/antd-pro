import { Request, Response } from 'express';

const school = [
  {
    id: '001',
    name: '学校名字',
    degreeEducation: 'C',
    address: '学校地址',
    foundingTime: '1956-01-09T08:44:07.000+0000',
    schoolMotto: '校训',
    principal: {
      id: 'd8964c40-5874-454b-a766-c446aa192ed0',
      name: 'By JC0',
      gender: 'M',
      age: 52,
      phoneNo: '13758458323',
      email: '84232274@outlook.com',
      address: 'Chang Xing Street',
    },
    collegeAmount: 0,
    collegeList: [
      {
        id: '0011',
        schoolId: '001',
        collegeNo: 1,
        name: '学院',
        foundingTime: '1960-06-09T08:44:07.000+0000',
        principal: '院长',
        professionAmount: 8,
        professionList: [
          {
            id: '00111',
            schoolId: '001',
            collegeId: '0011',
            name: '专业',
            professionNo: 1,
            classGradeList: [
              {
                id: '001111',
                schoolId: '001',
                collegeId: '0011',
                professionId: '00111',
                name: '班级',
                classTeacher: '班主任',
              },
            ],
          },
        ],
      },
    ],
  },
];

function getSchool(req: Request, res: Response) {
  const { schoolId } = req.body;
  const schoolItem = school.filter(item => item.id === schoolId);

  setTimeout(
    () =>
      res.json({
        promptMessages: [],
        resultData: schoolItem[0],
        success: true,
        type: null,
      }),
    1000,
  );
}

function submitSchool(req: Request, res: Response) {
  const { id } = req.body;
  school.forEach(element => {
    if (element.id === id) {
      // eslint-disable-next-line no-param-reassign
      element = req.body;
    }
  });
  return res.json({
    promptMessages: [],
    resultData: null,
    success: true,
    type: null,
  });
}

export default {
  'POST /api/form/school/getSchool': getSchool,
  'POST /api/form/school/submitSchool': submitSchool,
};
