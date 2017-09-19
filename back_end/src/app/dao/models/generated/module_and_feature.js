/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('module_and_feature', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		module_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
		},
		feature_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		support_degree: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1000'
		},
		support_desc: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
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
		tableName: 'module_and_feature',
		timestamps: false,
		freezeTableName: true
	});
};
