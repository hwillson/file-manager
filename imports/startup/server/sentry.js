import { Meteor } from 'meteor/meteor';
import Raven from 'raven';

const sentryDsn = Meteor.settings.private.sentry.dsn;
if (sentryDsn) {
  Raven.config(sentryDsn).install();
}
