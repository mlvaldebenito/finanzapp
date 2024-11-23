import requests

class SantanderScraper:
    @classmethod
    def fetch_login_tokens(cls, banking_credentials):
        data = f'scope=Completa&username=00{banking_credentials.user.rut}&password={banking_credentials.password}&client_id=4e9af62c-6563-42cd-aab6-0dd7d50a9131'
        headers = {
            'Accept': 'application/json',
            'Accept-Language': 'es-419,es;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://mibanco.santander.cl',
            'Referer': 'https://mibanco.santander.cl/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'app': '007',
            'canal': '003',
            'nro_ser': '1',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'tokentbk': 'TOKEN@4152811016027300',
        }
        json_response = requests.post(
            'https://apideveloper.santander.cl/sancl/privado/party_authentication_restricted/party_auth_dss/v1/oauth2/token',
            headers=headers,
            data=data,
        ).json()
        return json_response["access_token"], json_response["tokenJWT"]
    
    @classmethod
    def fetch_bank_accounts(cls, jwt_token, rut):
        headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'es-419,es;q=0.9',
            'access-token': jwt_token,
            'content-type': 'application/json',
            'origin': 'https://mibanco.santander.cl',
            'priority': 'u=1, i',
            'referer': 'https://mibanco.santander.cl/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        }

        json_data = {
            'cabecera': {
                'HOST': {
                    'USUARIO-ALT': 'GHOBP',
                    'TERMINAL-ALT': '',
                    'CANAL-ID': '078',
                },
                'CanalFisico': '003',
                'CanalLogico': '74',
                'RutCliente': f'00{rut}',
                'RutUsuario': f'00{rut}',
                'InfoDispositivo': '003',
                'InfoGeneral': {
                    'NumeroServidor': '01',
                },
            },
            'INPUT': {
                'ID-RECALL': '',
                'USUARIO-ALT': 'GHOBP',
                'ENTIDAD': '',
                'TIPODOCUMENTO': '',
                'NUMERODOCUMENTO': f'00{rut}',
                'CANALACONSULTAR': '',
                'CRUCEACONSULTAR': '',
                'ESTADORELACION': '',
            },
        }
        response = requests.post('https://apiper.santander.cl/perdsk/datosCliente/cruceProductosOnline', headers=headers, json=json_data)
        return response.json()["DATA"]["OUTPUT"]["MATRICES"]["MATRIZCAPTACIONES"]["e1"]
    
    @classmethod
    def fetch_bank_movements(cls, access_token, bank_account):
        headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es-419,es;q=0.9',
            'Authorization': f'Bearer {access_token}',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://mibanco.santander.cl',
            'Referer': 'https://mibanco.santander.cl/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'X-Client-Code': 'STD-PER-FPP',
            'X-Organization-Code': 'Santander',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'x-B3-SpanId': 'AL43243287438243P',
            'x-santander-client-id': 'O2XRSU4kVspEGbLDDGfFC5BOTrGKh5Ts',
            'x-schema-id': 'GHOBP',
        }

        json_data = {
            'accountId': bank_account,
            'currency': 'CLP',
            'commercialGroup': '',
        }

        response = requests.post(
            'https://openbanking.santander.cl/account_balances_transactions_and_withholdings_retail/v1/current-accounts/transactions',
            headers=headers,
            json=json_data,
        )
        return response.json()
