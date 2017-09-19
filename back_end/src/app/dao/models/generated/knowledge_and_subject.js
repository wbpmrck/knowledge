/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('knowledge_and_subject', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		knowledge_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
		},
		subject_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
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
		tableName: 'knowledge_and_subject',
		timestamps: false,
		freezeTableName: true
	});
};
