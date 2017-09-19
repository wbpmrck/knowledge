/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('module', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ename: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		cname: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		desc: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		version: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0+'
		},
		activeness: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		use_prj_num: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		size: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		license: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		enable: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			defaultValue: '1'
		},
		create_time: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		update_time: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'module',
		timestamps: false,
		freezeTableName: true
	});
};
