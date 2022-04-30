require('colors')

module.exports = async client => {   
      client.user.setActivity('Get Jinxed', { type: 'LISTENING' });
      console.log(`Discord API >> Logged in as ${client.user.tag}.`.magenta);
};