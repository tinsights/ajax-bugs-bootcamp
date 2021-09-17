module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  Add seed commands here.
    // Example:
    const featureList = [
      {
        name: 'Messaging',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Stories',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Status Update',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('features', featureList);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
