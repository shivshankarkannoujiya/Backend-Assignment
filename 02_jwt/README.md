# JWT Task 

- username - The username to be included in the JWT payload, Must be a valid email address.
- password - The password to be included in the JWT payload,Should meet the defined length requirement (e.g., 6 characters)
- A JWT string if the username and password are valid.
- Returns null if the username is not a valid email or the password does not meet the length requirement.

## Solution
```javascript
import jwt from 'jsonwebtoken'
import zod from 'zod'
const JWT_KEY = 'secret_Password'

const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(6)


function generateJwt(username, passwrod){
    try {
        emailSchema.safeParse(username)
        passwordSchema.safeParse(passwrod)
    
        const payload = {
            username: username,
            passwrod: passwrod
        }
    
        const token = jwt.sign(payload, JWT_KEY,{expiresIn:`1h`})
        return token

    } catch (error) {
        console.error(`Validation Error: ${error.errors}`)
        return null
    }
}

const token = generateJwt('abhi@gmail.com', 'abc123')
// console.log(token)



function verifyJwt(token){
    try {
        jwt.verify(token,JWT_KEY)
        return true

    } catch (error) {
        console.log(`Token Verification failed: ${error.message}`)
        return false
    }
}


const ans = verifyJwt(token, JWT_KEY)
// console.log(ans)



function decodeJwt(token){
    const decoded = jwt.decode(token)
    return decoded
}

const Decoded = decodeJwt(token)
console.log(Decoded);

```