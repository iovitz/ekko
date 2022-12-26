import { DataTypes } from 'sequelize'
import { sequelize } from '../mysql_connection'

export const BookCategory1Model = sequelize.define(
  'book_category_1',
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      field: 'name',
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export const BookCategory2Model = sequelize.define(
  'book_category_2',
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      field: 'name',
      allowNull: false
    },
    pid: {
      type: DataTypes.INTEGER,
      field: 'pid',
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export const BookCategory3Model = sequelize.define(
  'book_category_3',
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      field: 'name',
      allowNull: false
    },
    pid: {
      type: DataTypes.INTEGER,
      field: 'pid',
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

BookCategory1Model.hasMany(BookCategory2Model, {
  as: 'book_category_2',
  foreignKey: 'pid'
})

BookCategory2Model.belongsTo(BookCategory1Model, {
  foreignKey: 'pid',
  targetKey: 'id'
})

BookCategory2Model.hasMany(BookCategory3Model, {
  as: 'book_category_3',
  foreignKey: 'pid'
})

BookCategory3Model.belongsTo(BookCategory2Model, {
  foreignKey: 'pid',
  targetKey: 'id'
})
