const { Sequelize, DataTypes } = require('sequelize');
// require('pg').types.setTypeParser(1114, (stringValue) => {
//   return new Date(stringValue + '+0000');
// });

const sequelize = new Sequelize('dow', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});
const Nurse = sequelize.define(
  'nurse',
  {
    // Model attributes are defined here
    nurse_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nurse_name: {
      type: DataTypes.STRING,
    },
    nurse_type: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

const Facility = sequelize.define(
  'facility',
  {
    // Model attributes are defined here
    facility_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facility_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

const Job = sequelize.define(
  'job',
  {
    // Model attributes are defined here
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facility_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Facility,
        key: 'facility_id',
      },
    },
    nurse_type_needed: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    total_number_nurses_needed: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    timestamps: false,
  }
);
//   CREATE TABLE question_one_shifts(
//     shift_id INTEGER PRIMARY KEY,
//     facility_id INTEGER,
//     shift_date DATE,
//     start_time TIME WITHOUT TIME ZONE,
//     end_time TIME WITHOUT TIME ZONE
//     );
const question_one_shift = sequelize.define(
  'question_one_shift',
  {
    // Model attributes are defined here
    shift_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facility_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Facility,
        key: 'facility_id',
      },
    },
    shift_date: {
      type: DataTypes.DATE,
      // allowNull defaults to true
    },
    start_time: { type: DataTypes.INTEGER },
    end_time: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    timestamps: false,
  }
);
const nurse_hired_job = sequelize.define(
  'nurse_hired_job',
  {
    // Model attributes are defined here
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: 'job_id',
      },
    },
    nurse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Nurse,
        key: 'nurse_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

question_one_shift.hasOne(Facility, { foreignKey: 'facility_id' });

Facility.belongsTo(question_one_shift, { foreignKey: 'facility_id' });

Facility.hasMany(Job, {
  foreignKey: 'job_id',
});
Job.belongsTo(Facility);

Nurse.hasMany(Job, {
  foreignKey: 'job_id',
});
Job.belongsTo(Nurse);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
main();

module.exports = {
  Nurse,
  Job,
  Facility,
  question_one_shift,
  nurse_hired_job,
};
