import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import DocConfig from './doc.config';
import HelperConfig from './helper.config';
import AuthConfig from './auth.config';
import VNPayConfig from './vnpay.config';
import SendgridConfig from './sendgrid.config';
export default [
    AppConfig,
    SendgridConfig,
    DocConfig,
    AuthConfig,
    DatabaseConfig,
    HelperConfig,
    VNPayConfig,
];
