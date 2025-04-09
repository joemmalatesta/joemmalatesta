import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {

  if (browser) {
    posthog.init(
      'phc_GjCIPIk7gYN7EEf8q58cgnH0R1HwkLuRnqjHOFenOfL',
      { api_host: 'https://us.i.posthog.com',
        capture_pageview: false,
        capture_pageleave: false
       }
    )
  }
  return
};