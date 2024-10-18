module.exports = {
    'status': { 'CREATE': 1, 'UPDATE': 2, 'DELETE': 3, 'DISABLED': 4 },
    'authentication': {
        'authTokenExpiry': '1d',
        'refreshTokenExpiry': '3d'
    },
    'statusCodes': { 'SUCCESS': '1', 'FAIL': '0', 'VALIDATION': '2', 'UNAUTHENTICATED': '-1', 'NOT_FOUND': '-2' },
    'gender': { 'male': 1, 'female': 2, 'Other': 3 }
}