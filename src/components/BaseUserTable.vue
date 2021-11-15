<template>
  <div v-scroll="handleScroll">
    <table class="users-table">
      <thead class="users-table__row">
      <tr class="users-table__row">
        <th></th>
        <th class="users-table__header users-table__header_truncate">Participant</th>
        <th class="users-table__header users-table__header_truncate">work email</th>
        <th class="users-table__header users-table__header_truncate">signed up</th>
      </tr>
      </thead>
      <tbody class="users-table__row">
      <tr v-for="user in users"
          :key="user.id"
          class="users-table__row"
      >
        <td class="users-table__content users-table__content_truncate">
          <img class="users-table__avatar"
               :src="user.avatar"
               :alt="'avatar of ' + user.name"
          >
        </td>
        <td class="users-table__content users-table__content_truncate">{{ user.name }}</td>
        <td class="users-table__content users-table__content_truncate">{{ user.email }}</td>
        <td class="users-table__content users-table__content_truncate"
            v-time-ago="user.signed_up"
        ></td>
      </tr>
      <tr v-for="fakeUser in fakeUsers"
          :key="fakeUser"
          class="users-table__row"
      >
        <td class="users-table__content users-table__content_fake users-table__avatar"></td>
        <td class="users-table__content users-table__content_fake"></td>
        <td class="users-table__content users-table__content_fake"></td>
        <td class="users-table__content users-table__content_fake"></td>
      </tr>
      </tbody>
    </table>
    <div v-if="lastId === null"
         class="users-table__no-data"
    >
      ✓ All users loaded
    </div>
  </div>
</template>

<script>
import {getUsers, getUsersCount} from '@/services/api'

export default {
  name: "BaseUserTable",

  data: function () {
    return {
      users: [], // Список пользователей
      lastId: undefined, // ID последнего полученного пользователя
      usersCount: 10, // Сколько всего пользователей
      isLoading: false, // Флаг загрузки данных
    }
  },

  computed: {
    fakeUsers: (vm) => new Array(vm.usersCount - vm.users.length).fill(Math.random()).map((item, i) => item + i),
  },

  created() {
    this.isLoading = true;
    Promise.all([
      getUsers(this.lastId),
      getUsersCount(),
    ])
      .then(response => {
        this.users = response[0].users;
        this.lastId = response[0].lastId;
        this.usersCount = response[1];
      })
      .finally(() => {
        this.isLoading = false;
      })
  },

  methods: {
    addUsers() {
      const vm = this;
      this.isLoading = true;
      getUsers(this.lastId)
        .then(response => {
          vm.users.push(...response.users);
          vm.lastId = response.lastId;
        })
        .finally(() => {
          vm.isLoading = false;
        })
    },
    handleScroll(_, el) {
      const usersListPosition = Math.abs(el.getBoundingClientRect().top) + window.innerHeight;
      if (!this.isLoading && usersListPosition >= this.getUserRowsHeight()) {
        this.addUsers();
      } else if (this.users.length === this.usersCount) {
        // Когда загрузили всех пользователей можно вылкючить слушатель скролла
        return true;
      }
    },
    getUserRowsHeight() {
      const HEIGHT = 48; // Высота строк и отступов таблицы
      const rowsCount = this.users.length;
      const gapsCount = this.users.length - 1;
      return rowsCount * HEIGHT + gapsCount * HEIGHT;
    }
  },
}
</script>

<style lang="scss" scoped>
$height: 48px;
$row-height: $height;
$gap-height: $height;
$avatar-size: $height;

.users-table {
  display: grid;
  border-collapse: collapse;
  width: 100%;
  grid-template-columns:
    $avatar-size
    minmax(150px, 2fr)
    minmax(150px, 3fr)
    minmax(150px, 1fr);
  grid-auto-rows: auto $row-height;
  grid-column-gap: 20px;
  grid-row-gap: $gap-height;
  align-items: center;
  text-align: left;

  &__row {
    display: contents;
  }

  &__header {
    font-size: 0.6rem;
    color: $gray;
  }

  &__content,
  &__header {
    padding: 0;

    &_truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__content {
    &_fake {
      height: $row-height;
      border-radius: 67px;
      animation: blinking 2s linear infinite;


      @keyframes blinking {
        0% {
          background-color: $gray;
        }

        50% {
          background-color: $gray-light;
        }

        100% {
          background-color: $gray;
        }
      }

    }
  }

  &__avatar {
    border-radius: 50%;
    background-color: $gray-light;
  }

  &__no-data {
    margin-top: 42px;
    background-color: $green-light;
    color: $green;
    text-align: center;
    border-radius: 67px;
    padding: 26px;
  }
}
</style>
