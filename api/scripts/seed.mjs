const USER_COUNT = 5;
const MANAGER_COUNT = 2;
const EVENT_COUNT = 10;
const TICKET_COUNT = 20;
(function () {
  db.getCollection('users').deleteMany({});
  db.getCollection('events').deleteMany({});
  db.getCollection('managerdatas').deleteMany({});
  db.getCollection('eventtickets').deleteMany({});

  // Usuarios standard
  const users = [];
  for (let i = 1; i <= USER_COUNT; i++) {
    users.push({
      email: `user${i}@example.com`,
      type: 'standard',
      blocked: false,
      phoneNumber: Math.random() > 0.5 ? `+54221${1234567 + i}` : undefined,
      dni: 1000 + i,
      firstName: `User${i}`,
      lastName: 'Test',
      birthdate: new Date(1990, 0, i),
      eventTickets: [],
    });
  }

  const resUsers = db.getCollection('users').insertMany(users);
  print('Inserted users:', Object.keys(resUsers.insertedIds).length);
  const insertedUserIds = Object.values(resUsers.insertedIds);
  print('Inserted user IDs:', insertedUserIds);

  // Usuarios manager
  const managers = [];
  for (let i = 1; i <= MANAGER_COUNT; i++) {
    managers.push({
      email: `manager${i}@example.com`,
      type: 'manager',
      blocked: false,
      phoneNumber: Math.random() > 0.5 ? `+54221${1234567 + i}` : undefined,
      dni: 2000 + i,
      firstName: `Manager${i}`,
      lastName: 'Test',
      birthdate: new Date(1985, 0, i),
      eventTickets: [],
    });
  }

  const resManagers = db.getCollection('users').insertMany(managers);
  print('Inserted managers:', Object.keys(resManagers.insertedIds).length);
  const insertedManagerIds = Object.values(resManagers.insertedIds);
  print('Inserted manager IDs:', insertedManagerIds);

  // Usuario admin
  const admin = {
    email: `admin@example.com`,
    type: 'admin',
    blocked: false,
    dni: 9001,
    firstName: 'Admin',
    lastName: 'User',
    birthdate: new Date(1980, 0, 1),
    eventTickets: [],
  };

  const resAdmin = db.getCollection('users').insertOne(admin);
  print('Inserted admin.');
  const insertedAdminId = Object.values(resAdmin.insertedId);
  print('Inserted admin ID:', insertedAdminId);

  insertedUserIds.push(...insertedManagerIds, ...insertedAdminId);
  print('Total users:', insertedUserIds.length);

  // Eventos
  const eventDocs = [];
  for (let i = 0; i < EVENT_COUNT; i++) {
    const managerId = insertedManagerIds[i % MANAGER_COUNT];

    const datesCount = Math.floor(Math.random() * 5) + 1;
    const dates = [];
    const start = new Date();
    start.setDate(start.getDate() + Math.floor(Math.random() * 90) - 2);
    start.setHours(Math.floor(Math.random() * 24));
    start.setMinutes(Math.random() < 0.5 ? 0 : 30);
    start.setSeconds(0);
    start.setMilliseconds(0);

    let current = new Date(start);
    for (let j = 0; j < datesCount; j++) {
      dates.push({
        datetime: new Date(current),
        sold: 0,
      });
      const minIncrementMs = 30 * 60 * 1000;
      const extraSteps = Math.floor(Math.random() * 8);
      const incrementMs = minIncrementMs + extraSteps * minIncrementMs;
      current = new Date(current.getTime() + incrementMs);
    }

    eventDocs.push({
      name: `Evento ${i}`,
      description: `Descripción del evento ${i}`,
      location: `Ubicación ${i % 15}`,
      capacity: Math.floor(Math.random() * 5 + 1),
      ticketPrice: Math.floor(Math.random() * 99 + 1) * 100,
      dates: dates,
      manager: managerId,
    });
  }

  const resEvents = db.getCollection('events').insertMany(eventDocs);
  print('Inserted events:', Object.keys(resEvents.insertedIds).length);
  const insertedEventIds = Object.values(resEvents.insertedIds);

  // ManagerData - datos adicionales de usuarios manager
  const managerDataDocs = [];
  const managerIdToEvents = {};
  Object.entries(resEvents.insertedIds).forEach(([k, evtId]) => {
    const evt = eventDocs[parseInt(k)];
    const managerIdStr = evt.manager.toString();
    managerIdToEvents[managerIdStr] = managerIdToEvents[managerIdStr] || [];
    managerIdToEvents[managerIdStr].push(evtId);
  });

  insertedManagerIds.forEach((id) => {
    const idStr = id.toString();
    managerDataDocs.push({
      userId: ObjectId(idStr),
      businessName: `Business ${idStr.slice(-4)}`,
      cuit: 300000000 + (parseInt(idStr.slice(-4), 16) % 1000000),
      managedEvents: managerIdToEvents[idStr] || [],
    });
  });

  // Bulks que agregan a cada manager su managerData
  const managerBulks = managerDataDocs.map((doc) => ({
    updateOne: {
      filter: { _id: doc.userId },
      update: [
        { $set: { managerData: doc } },
        {
          $project: {
            'managerData.userId': 0,
          },
        },
      ],
    },
  }));

  const resManagerDatas = db.getCollection('users').bulkWrite(managerBulks);
  print('Updated ManagerDatas:', resManagerDatas.modifiedCount);

  // Entradas
  const tickets = [];
  for (let i = 1; i <= TICKET_COUNT; i++) {
    const eventIdx = Math.floor(Math.random() * insertedEventIds.length);
    const eventId = insertedEventIds[eventIdx];

    const userIdx = Math.floor(Math.random() * insertedUserIds.length);
    const userId = insertedUserIds[userIdx];

    const event = eventDocs[eventIdx];
    const dateIdx = Math.floor(Math.random() * event.dates.length);
    const date = event.dates[dateIdx].datetime;

    tickets.push({
      event: eventId,
      date,
      user: userId,
      usable: Math.random() > 0.2,
    });
  }

  const resTickets = db.getCollection('eventtickets').insertMany(tickets);
  print('Inserted tickets:', Object.keys(resTickets.insertedIds).length);

  //  Modifico los date.sold en los eventos
  const salesCount = {};
  tickets.forEach((ticket) => {
    const eventIdStr = ticket.event.toString();
    const dateMs = new Date(ticket.date).getTime();
    const key = `${eventIdStr}|${dateMs}`;
    salesCount[key] = (salesCount[key] || 0) + 1;
  });

  const eventBulks = Object.entries(salesCount).map(([key, cnt]) => {
    const [eventIdStr, dateMs] = key.split('|');
    return {
      updateOne: {
        filter: {
          _id: ObjectId(eventIdStr),
          'dates.datetime': new Date(dateMs),
        },
        update: { $inc: { 'dates.$.sold': cnt } },
      },
    };
  });

  const resEventBulks = db.getCollection('events').bulkWrite(eventBulks);
  print('Updated events sold counts:', resEventBulks.modifiedCount);

  print('\nDONE');
})();
