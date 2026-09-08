// Behavioural tests for degree ranking. Run with `node --test`.
//
// Regression guard: the level ranking must recognise *localized* degree
// titles (Spanish "Máster", Chinese "硕士"/"学士", French "Licence"), not just
// the English "Master"/"Bachelor" spellings. A master must always outrank a
// bachelor even when the bachelor completed more recently — otherwise the
// generated "highest obtained degree" badge shows the wrong diploma (as it
// did for the es/zh CV variants).

const test = require('node:test');
const assert = require('node:assert/strict');

const { highestObtainedDegree } = require('./degrees');

// The bachelor deliberately completes AFTER the master, so only correct
// level-scoring (master > bachelor) — not the endDate tiebreak — can put the
// master first. Dates are safely in the past so both count as "obtained"
// regardless of when the test runs.
function masterAndLaterBachelor(masterStudyType, bachelorStudyType) {
  return [
    {
      institution: 'UMons',
      studyType: masterStudyType,
      area: 'X',
      startDate: '2016-09-01',
      endDate: '2018-06-30',
    },
    {
      institution: 'EPHEC',
      studyType: bachelorStudyType,
      area: 'Y',
      startDate: '2019-09-01',
      endDate: '2021-06-30',
    },
  ];
}

test('English master outranks a more recent bachelor', () => {
  const edu = masterAndLaterBachelor('Master of Science - MS', "Professional Bachelor's degree");
  assert.equal(highestObtainedDegree(edu).studyType, 'Master of Science - MS');
});

test('Spanish "Máster" (accented) outranks "Bachelor profesional"', () => {
  const edu = masterAndLaterBachelor('Máster en Ciencias', 'Bachelor profesional');
  assert.equal(highestObtainedDegree(edu).studyType, 'Máster en Ciencias');
});

test('Chinese "硕士" outranks "学士 (BA)"', () => {
  const edu = masterAndLaterBachelor('理学硕士', '文学学士 (BA)');
  assert.equal(highestObtainedDegree(edu).studyType, '理学硕士');
});

test('French "Master" outranks "Bachelier"', () => {
  const edu = masterAndLaterBachelor('Master en Sciences', 'Bachelier professionnalisant');
  assert.equal(highestObtainedDegree(edu).studyType, 'Master en Sciences');
});
