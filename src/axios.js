import { Component } from 'react';
import axios from 'axios';
Component.prototype.$axios = axios;

const baseurl = 'http://localhost:8081/';
Component.prototype.$baseurl = baseurl;
export { axios, baseurl };