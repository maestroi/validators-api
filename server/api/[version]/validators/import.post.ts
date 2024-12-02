/**
 * Import validators from the public/validators folder and sets the logo in case it is missing
 */
export default defineEventHandler(async () => {
  try {
    // First update database with default data, this will populate the logo of unknown validators that didn't have an logo
    const validators = await useDrizzle().select().from(tables.validators).all()
    await Promise.allSettled(validators.map(validator => storeValidator(validator.address, validator, { upsert: true })))

    const { nimiqNetwork } = useRuntimeConfig().public

    // Now, get the custom validators from the public/validators folder
    await importValidatorsFromFiles(`./public/validators/${nimiqNetwork}/`)
  }
  catch (e) {
    return createError((e as Error))
  }
  return 'Validators imported successfully'
})
