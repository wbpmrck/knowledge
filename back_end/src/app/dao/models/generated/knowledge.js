/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('knowledge', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		parent_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
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
		tableName: 'knowledge',
		timestamps: false,
		freezeTableName: true
	});
};
