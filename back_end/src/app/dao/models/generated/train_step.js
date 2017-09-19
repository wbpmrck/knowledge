/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('train_step', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		train_route_map_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		priority: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1'
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
		tableName: 'train_step',
		timestamps: false,
		freezeTableName: true
	});
};
