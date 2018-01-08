import { Meteor } from 'meteor/meteor';
import Raven from 'raven-js';

const sentryDsn = Meteor.settings.public.sentry.dsn;
if (sentryDsn) {
  Raven.config(sentryDsn).install();
}
