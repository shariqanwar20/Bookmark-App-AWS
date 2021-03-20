#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BookmarkAppServerStack } from '../lib/bookmark_app_server-stack';

const app = new cdk.App();
new BookmarkAppServerStack(app, 'BookmarkAppServerStack');
