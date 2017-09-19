/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('train_step_and_knowledge', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		knowledge_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		train_step_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
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
		tableName: 'train_step_and_knowledge',
		timestamps: false,
		freezeTableName: true
	});
};
