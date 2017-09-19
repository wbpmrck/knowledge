/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('train_route_map', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		subject_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		desc: {
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
		tableName: 'train_route_map',
		timestamps: false,
		freezeTableName: true
	});
};
