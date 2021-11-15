const users = require('@/assets/users');

const date = new Date();
users[0].signed_up = date.toString(); // Как будто кто-то только что заходил

date.setMinutes(date.getMinutes() - 45);
users[1].signed_up = date.toString(); // Как будто кто-то заходил в течении часа

date.setHours(date.getHours() - 2);
users[2].signed_up = date.toString(); // Как будто кто-то заходил в дня

date.setDate(date.getDate() - 1);
users[3].signed_up = date.toString(); // Как будто кто-то заходил вчера

users.map(user => {user.signed_up = new Date(user.signed_up);});
users.sort((a, b) => b.signed_up.getTime() - a.signed_up.getTime());


/**
 * Это как бы бекенд. Сильно можно не вникать
 *
 */

const usersAmount = 20; // Максимальное количество получаемых пользователей за раз
/**
 *
 * @param lastId
 * @returns {Promise<unknown>}
 */
export function getUsers(lastId) {
  return new Promise(r => {
    setTimeout(() => {
      const response = {
        users: [],
        lastId: null,
      };
      if (lastId === undefined) {
        response.users = users.slice(0, usersAmount);
        response.lastId = usersAmount;
      } else if (lastId === null) {
        response.lastId = null;
      } else {
        const nextUserIndex = lastId + usersAmount;
        response.users = users.slice(lastId, nextUserIndex);
        response.lastId = nextUserIndex > users.length ? null : nextUserIndex;
      }

      r(response);
    }, 2000);
  });
}

export function getUsersCount() {
  return new Promise(r => {
    setTimeout(r.bind(null, users.length), 2000)
  })
}
