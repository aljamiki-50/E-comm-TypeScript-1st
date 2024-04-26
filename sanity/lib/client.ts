import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "sk4C1ZBRBJl3bsNbiqLRkNHD7RYVvmoWpvJjYSspeOCxtR91PowzDyrVAv45LjrUrd75OHTprF7zkBTfvVNOtgI29dIozwPSbYZ5BtVrpElINQYAxxyoIghZy2BmJSwxTON54BDDMEZco5VeMvgEoe8w2OQbW1iN2ql9LjGDdygUbJWoyKR3"

})
