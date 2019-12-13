import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

const LINKS = [];
const COPYRIGHT = '2019 Produced by Zerpor';

const Footer = () => <DefaultFooter copyright={COPYRIGHT} links={LINKS} />;

export default Footer;
