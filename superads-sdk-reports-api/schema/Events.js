cube(`Events`, {
    sql: `SELECT * FROM super_ads.events`,

    joins: {},

    measures: {
        count: {
            type: `count`,
            drillMembers: [eventTime, createId, campaign, appId, adSetId, chId, userId, offerId, creativeId, eventId, eventType]
        },
        anyEventUniq: {
            sql: `user_id`,
            type: `countDistinct`,
            title: `Any Event - Unique`
        },
        anyEvent: {
            type: `count`,
            title: `Any Event - Total`
        },
        clicksUniq: {
            type: `countDistinct`,
            title: `Clicks - Unique`,
            sql: `user_id`,
            filters: [
                { sql: `${CUBE.eventType} = 'click'` }
            ]
        },
        impressions: {
            type: `count`,
            title: `All Impressions`,
            filters: [
                { sql: `${CUBE.eventType} = 'impression'` }
            ]
        }
        // uniqueUsersCount: {
        //     sql: 'user_id',
        //     type: 'countDistinct'
        // },
        // uniqueClicksCount : {
        //     sql: `${uniqueSourceCount} / nullif(${checkinsTotal}, 0)`,
        //     type: 'number'
        // }
    },
    dimensions: {
        eventTime: {
            sql: `event_time`,
            type: `time`
        },
        createId: {
            sql: `create_id`,
            type: `number`
        },
        campaign: {
            sql: `campaign`,
            type: `number`
        },
        appId: {
            sql: `app_id`,
            type: `number`
        },
        adSetId: {
            sql: `ad_set_id`,
            type: `number`
        },
        chId: {
            sql: `ch_id`,
            type: `number`
        },
        userId: {
            sql: `user_id`,
            type: `number`
        },
        offerId: {
            sql: `offer_id`,
            type: `number`
        },
        creativeId: {
            sql: `creative_id`,
            type: `number`
        },
        eventId: {
            sql: `event_id`,
            type: `number`,
            primaryKey: true
        },
        eventType: {
            sql: `event_type`,
            type: `string`
        }
    }
});
